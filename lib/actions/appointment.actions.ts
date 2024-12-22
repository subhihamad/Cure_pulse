"use server";
import { ID } from "appwrite";
import { configAppwrite, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Query } from "node-appwrite";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";


export const CreateAppointment=async(appointmentData:CreateAppointmentParams)=>{
    try {
      const appointment=await databases.createDocument(
        configAppwrite.databaseId,
        configAppwrite.appointmentCollectionId,
        ID.unique(),
        appointmentData
      )
      return parseStringify(appointment);
    } catch (error) {
      console.log(error);
    }
  }

  export const getAppointment=async(appointmentId:string)=>{
    try {
      const appointment=await databases.getDocument(
        configAppwrite.databaseId,
        configAppwrite.appointmentCollectionId,
        //@ts-ignore
        appointmentId!
      )
      return parseStringify(appointment);
    } catch (error) {
      console.log(error);
    }
  }

  export const getRecentAppointmentList = async () => {
    try {
      const appointments = await databases.listDocuments(
        configAppwrite.databaseId!,
        configAppwrite.appointmentCollectionId!,
        [Query.orderDesc("$createdAt")]
      );
  
      
  
      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };
  
      const counts = (appointments.documents as Appointment[]).reduce(
        (acc, appointment) => {
          switch (appointment.status) {
            case "scheduled":
              acc.scheduledCount++;
              break;
            case "pending":
              acc.pendingCount++;
              break;
            case "cancelled":
              acc.cancelledCount++;
              break;
          }
          return acc;
        },
        initialCounts
      );
  
      const data = {
        totalCount: appointments.total,
        ...counts,
        documents: appointments.documents,
      };
  
      return parseStringify(data);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the recent appointments:",
        error
      );
    }
  };

 export const updateAppointment=async({userId,appointmentId,appointment,type}:UpdateAppointmentParams)=>{
      try {
        const updatedAppointment=await databases.updateDocument(
          configAppwrite.databaseId,
          configAppwrite.appointmentCollectionId,
          appointmentId,
          appointment
        )
        revalidatePath('/admin');
        return parseStringify(updatedAppointment);
      } catch (error) {
        console.error(
          "An error occurred while retrieving the recent appointments:",
          error
        );
      }
  }