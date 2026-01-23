import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"

type Formfields = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm<Formfields>();

  const onSubmit: SubmitHandler<Formfields> = async (data) => {
    try{
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch(error) {
      setError("root", {
        message: "This email is already taken"
      });
    }
  };

  return (
    <>
      <div>LoginPage</div>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-2 flex flex-col p-5 m-5 ">
        <Label htmlFor="email">Enter your Email</Label>
        <Input {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")){
              return "Email must include @";
            }
            return true;
          }
        })} type="text" placeholder="Email" className="w-2xl max-w-3xl p-5 mb-5" />
        {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
        <Label htmlFor="email">Enter your Email</Label>
        <Input {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be 8 words long"
          }
        })} type="password" placeholder="Password" className="w-2xl max-w-3xl p-5 mb-5" />
        {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
        <div className="flex align-center justify-center">
          <Button disabled={isSubmitting} type="submit" variant="outline" className="size-10 w-30">{isSubmitting ? "Loading... ": "Login"}</Button>
        </div>
        {errors.root && (<div className="text-red-500">{errors.root.message}</div>)}
      </form>
    </>
  );
}
