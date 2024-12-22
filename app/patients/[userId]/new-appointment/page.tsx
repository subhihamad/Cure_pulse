
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPaitent } from "@/lib/actions/patient.actions";
import Image from "next/image";


const NewAppointment = async ({params:{userId}}:SearchParamProps) => {
    const paitent=await getPaitent(userId)
    console.log(paitent.$id);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm type="create" userId={userId} patientId={paitent?.$id} />

          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 CarePluse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;