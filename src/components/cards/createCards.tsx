import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, useWatch } from "react-hook-form";
import { cardSchema } from "../../validations/createCardSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { TCreateCard } from "../../types/createCards";
import { Button, FloatingLabel, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

type Props = {
  setOpen?: (open: boolean) => void;
  open?: boolean;
};

function CreateCard({ setOpen, open }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<TCreateCard>({ resolver: joiResolver(cardSchema) });


  const handleClose = () => {
    if (setOpen) {
      setOpen(false); 
    } else {
      window.history.back(); 
    }
  };


  const onSubmit = async (data: TCreateCard) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Card created:", response.data);
      toast.success("הכרטיס נוצר בהצלחה!");
      reset();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("אירעה שגיאה בעת יצירת הכרטיס");
    } finally {
      setIsSubmitting(false);
    }
  };
  const ErrorMessage = ({ error }: { error?: { message?: string } }) => {
    if (!error?.message) return null;
    return (
      <p className="mt-1 text-left text-sm text-red-500">{error.message}</p>
    );
  };

  const title = useWatch({ control, name: "title" });
    const subtitle = useWatch({ control, name: "subtitle" });
  const description = useWatch({ control, name: "description" });
  const email = useWatch({ control, name: "email" });
  const phone = useWatch({ control, name: "phone" });
  const zip = useWatch({ control, name: "address.zip" });
  const city = useWatch({ control, name: "address.city" });
  const houseNumber = useWatch({ control, name: "address.houseNumber" });
  const street = useWatch({ control, name: "address.street" });
  const country = useWatch({ control, name: "address.country" });

  

  return (
    <Modal show={open} onClose={handleClose}>
      <ModalHeader>Create a card</ModalHeader>
      <ModalBody className="max-h-[70vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md space-y-4 p-4"
        >
          <FloatingLabel
            {...register("title")}
            variant="standard"
            label="Title"
            color={errors.title ? "error" : undefined}
          />
          {!title?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.title} />

          <FloatingLabel
            {...register("subtitle")}
            variant="standard"
            label="Subtitle"
            color={errors.subtitle ? "error" : undefined}
          />
          {!subtitle?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.subtitle} />

          <FloatingLabel
            {...register("description")}
            variant="standard"
            label="Description"
            color={errors.description ? "error" : undefined}
          />
          {!description?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.description} />

          <FloatingLabel
            {...register("phone")}
            variant="standard"
            label="Phone"
            type="phone"
            color={errors.phone ? "error" : undefined}
          />
          <ErrorMessage error={errors.phone} />
          {!phone?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <FloatingLabel
            {...register("email")}
            variant="standard"
            label="email"
            type="email"
            color={errors.email ? "error" : undefined}
          />
          {!email?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.email} />

          <FloatingLabel
            {...register("web")}
            variant="standard"
            label="Web"
            color={errors.web ? "error" : undefined}
          />

          <ErrorMessage error={errors.web} />

          <FloatingLabel
            {...register("image.url")}
            variant="standard"
            label="image url"
            color={errors.image?.url ? "error" : undefined}
          />
          <ErrorMessage error={errors.image?.url} />

          <FloatingLabel
            {...register("image.alt")}
            variant="standard"
            label="image alt"
            color={errors.image?.alt ? "error" : undefined}
          />

          <ErrorMessage error={errors.image?.alt} />

          <FloatingLabel
            {...register("address.state")}
            variant="standard"
            label="State"
            color={errors.address?.state ? "error" : undefined}
          />

          <ErrorMessage error={errors.address?.state} />

          <FloatingLabel
            {...register("address.country")}
            variant="standard"
            label="Country"
            color={errors.address?.country ? "error" : undefined}
          />
          {!country?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.address?.country} />

          <FloatingLabel
            {...register("address.city")}
            variant="standard"
            label="City"
            color={errors.address?.city ? "error" : undefined}
          />
          {!city?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.address?.city} />

          <FloatingLabel
            {...register("address.street")}
            variant="standard"
            label="Street"
            color={errors.address?.street ? "error" : undefined}
          />
          {!street?.trim() && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.address?.street} />

          <FloatingLabel
            {...register("address.houseNumber")}
            variant="standard"
            label="House Number"
            type="number"
            color={errors.address?.houseNumber ? "error" : undefined}
          />
          {!houseNumber && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <ErrorMessage error={errors.address?.houseNumber} />

          <FloatingLabel
            {...register("address.zip")}
            variant="standard"
            label="Zip Code"
            type="number"
            color={errors.address?.zip ? "error" : undefined}
          />
          <ErrorMessage error={errors.address?.zip} />
          {!zip && (
            <p className="mt-1 text-xs text-gray-500">*Required</p>
          )}
          <Button
            type="submit"
            color="purple"
            fullSized
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
}



export default CreateCard;