import * as sdk from "node-appwrite";

export const configAppwrite = {
  projectId: process.env.PROJECT_ID!,
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT!,
  databaseId: process.env.DATABASE_ID!,
  storageId: process.env.NEXT_PUBLIC_BUCKET_ID!,
  patientCollectionId: process.env.PATIENT_COLLECTION_ID!,
  doctorCollectionId: process.env.DOCTOR_COLLECTION_ID!,
  appointmentCollectionId: process.env.APPOINTMENT_COLLECTION_ID!,
  publicKey: process.env.API_KEY!,
};

export const client = new sdk.Client();
client
  .setProject(configAppwrite.projectId!)
  .setEndpoint(configAppwrite.endpoint!)
  .setKey(configAppwrite.publicKey!);

export const messaging = new sdk.Messaging(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
