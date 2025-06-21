import axios from "axios";
import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { useForm, useWatch } from "react-hook-form";
import { registerSchema } from "../../validations/FormSchema.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Tsignup } from "../../types/signupType";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<Tsignup>({
    defaultValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",

      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
    },
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();



  const submitForm = async (data: Tsignup) => {
    console.log("Form submitted", data);
    setIsSubmitting(true);

    const { confirmPassword, isAdmin, ...cleanData } = data;

    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        cleanData,
      );

      console.log("Success");
      toast.success("ההרשמה הושלמה בהצלחה");
      navigate("/login");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "ההרשמה נכשלה. אנא נסה שוב";
      toast.error(msg);
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
  const firstName = useWatch({ control, name: "name.first" });
  const lastName = useWatch({ control, name: "name.last" });
  const country = useWatch({ control, name: "address.country" });
  const email = useWatch({ control, name: "email" });
  const phone = useWatch({ control, name: "phone" });
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const zip = useWatch({ control, name: "address.zip" });
  const city = useWatch({ control, name: "address.city" });
  const houseNumber = useWatch({ control, name: "address.houseNumber" });
  const street = useWatch({ control, name: "address.street" });
  

  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.CENTER}
      items={Aligns.CENTER}
      className="min-h-screen w-full px-4 pb-10 pt-24"
    >
      <h1 className="mb-6 text-4xl font-bold text-green-300 dark:text-white">
        Register
      </h1>
      <form onSubmit={handleSubmit(submitForm)} className="w-full px-4">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FloatingLabel
              {...register("name.first")}
              variant="standard"
              label="first name"
              type="text"
              color={errors.name?.first ? "error" : undefined}
            />

            {!firstName?.trim() && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}
            <ErrorMessage error={errors.name?.first} />
          </div>
          <div>
            <FloatingLabel
              {...register("name.middle")}
              variant="standard"
              label="middle name"
              type="text"
              color={errors.name?.middle ? "error" : undefined}
            />
            <ErrorMessage error={errors.name?.middle} />
          </div>
          <div>
            <FloatingLabel
              {...register("name.last")}
              variant="standard"
              label="last name"
              type="text"
              color={errors.name?.last ? "error" : undefined}
            />
            {!lastName?.trim() && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}
            <ErrorMessage error={errors.name?.last} />
          </div>
          <div>
            <FloatingLabel
              {...register("phone")}
              variant="standard"
              label="Phone"
              type="phone"
              color={errors.phone ? "error" : undefined}
            />
            {!phone?.trim() && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}
            <ErrorMessage error={errors.phone} />
          </div>
          <div>
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
          </div>
          <div>
            <FloatingLabel
              {...register("image.url")}
              variant="standard"
              label="image url"
              color={errors.image?.url ? "error" : undefined}
            />

            <ErrorMessage error={errors.image?.url} />
          </div>
          <div>
            <FloatingLabel
              {...register("image.alt")}
              variant="standard"
              label="image alt"
              color={errors.image?.alt ? "error" : undefined}
            />

            <ErrorMessage error={errors.image?.alt} />
          </div>
          <div>
            <FloatingLabel
              {...register("address.state")}
              variant="standard"
              label="State"
              color={errors.address?.state ? "error" : undefined}
            />

            <ErrorMessage error={errors.address?.state} />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <FloatingLabel
              {...register("address.houseNumber")}
              variant="standard"
              label="House Number"
              type="number"
              color={errors.address?.houseNumber ? "error" : undefined}
            />
            {houseNumber ===0 && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}
            <ErrorMessage error={errors.address?.houseNumber} />
          </div>
          <div>
            <FloatingLabel
              {...register("address.zip")}
              variant="standard"
              label="Zip Code"
              type="number"
              color={errors.address?.zip ? "error" : undefined}
            />
            {zip === 0 && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}
            <ErrorMessage error={errors.address?.zip} />
          </div>
          <div>
            <FloatingLabel
              {...register("password")}
              variant="standard"
              label="password"
              type="password"
              color={errors.password ? "error" : undefined}
            />
            {!password?.trim() && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}

            <ErrorMessage error={errors.password} />
          </div>
          <div>
            <FloatingLabel
              {...register("confirmPassword")}
              variant="standard"
              label="Confirm Password"
              type="password"
              color={errors.confirmPassword ? "error" : undefined}
            />
            {!confirmPassword?.trim() && (
              <p className="mt-1 text-xs text-gray-500">*Required</p>
            )}

            <ErrorMessage error={errors.confirmPassword} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div>
            <input
              type="checkbox"
              {...register("isBusiness")}
              id="isBusiness"
              className="h-4 w-4 rounded-sm text-green-800 transition-all"
            />
            <label htmlFor="isBusiness" className="m-2  dark:text-white">
              is Business
            </label>
          </div>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Flex>
  );
};

export default Signup;
