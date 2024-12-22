"use server";
import { ID, Query } from "appwrite";

import { parseStringify } from "../utils";
import { configAppwrite, databases, storage, users } from "../appwrite.config";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const docs = await users.list([Query.equal("email", [user.email])]);

      return docs?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    console.log(user);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patientData
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(
        configAppwrite.storageId!,
        ID.unique(),
        inputFile
      );
    }
    const newPatient = await databases.createDocument(
      configAppwrite.databaseId,
      configAppwrite.patientCollectionId,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file?.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${configAppwrite.endpoint}/storage/buckets/${configAppwrite.storageId}/files/${file?.$id}/view?project=${configAppwrite.projectId}`
          : null,
        ...patientData,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPaitent=async(userId:string)=>{
  try {
    const paitent=await databases.listDocuments(
      configAppwrite.databaseId!,
      configAppwrite.patientCollectionId,
      [Query.equal('userId',[userId])]
    )

    return parseStringify(paitent.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

