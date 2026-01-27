import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  role: z.enum(['student', 'instructor']),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

export default function Signup() {

  const { handleSubmit,
  setError,
  formState: { errors, isSubmitting },
  ...form
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
    resolver: zodResolver(schema),
  });
  
  const signup = useAuthStore(state => state.signup);
  const navigate = useNavigate();

  const onSubmit: (SubmitHandler<FormValues>) = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { confirmPassword, ...signupData} = data;

      const success = await signup(signupData);
      
      if (success) {
        const user = useAuthStore.getState().currentUser;

        toast.success(`Welcome, ${user?.name}!`);

        if (user?.role === 'instructor') {
          navigate('/instructor', { replace: true });
        } else {
          navigate('/my-course', { replace: true });
        }
      } else {
        toast.error('Signup failed. Email may already exist.');
      }
    } catch (error){
      setError("root", {
        message: error instanceof Error ? error.message : "Something went wrong",
      });
      toast.error(`Sign up failed fue to ${error}. Please try again`);
    }
  };
    
  return (
    <Card className="w-full sm:max-w-md flex align-center justify-center">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Sign up to use the EdTech
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller name='name' control={form.control} render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>
                  Full Name:
                </FieldLabel>

                <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="Enter your full name" autoComplete="off" />
                {fieldState.invalid && (<FieldError errors= {[fieldState.error]} />
                )}
              </Field>
            )}
            />
            <Controller name='email' control={form.control} render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>
                  Email:
                </FieldLabel>

                <Input {...field} id="email" aria-invalid={fieldState.invalid} placeholder="Enter your email" autoComplete="off" />
                {fieldState.invalid && (<FieldError errors= {[fieldState.error]} />
                )}
              </Field>
            )}
            />
            <Controller name='password' control={form.control} render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='password'>
                  Password:
                </FieldLabel>

                <Input {...field} id="password" aria-invalid={fieldState.invalid} placeholder="Enter Password" autoComplete="off" />
                {fieldState.invalid && (<FieldError errors= {[fieldState.error]} />
                )}
              </Field>
            )}
            />
            <Controller name='confirmPassword' control={form.control} render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='confirmPassword'>
                  Confirm Password:
                </FieldLabel>

                <Input {...field} id="confirmPassword" aria-invalid={fieldState.invalid} placeholder="Confirm Password" autoComplete="off" />
                {fieldState.invalid && (<FieldError errors= {[fieldState.error]} />
                )}
              </Field>
            )}
            />
            <Controller name='role' control={form.control} render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='role'>
                  Role:
                </FieldLabel>
                <RadioGroup defaultValue="student" className="w-fit">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="student" id='student' />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="instructor" id='instructor' />
                    <Label htmlFor="instructor">Instructor</Label>
                  </div>
                </RadioGroup>
                
                {fieldState.invalid && (<FieldError errors= {[fieldState.error]} />
                )}
              </Field>
            )}
            />
          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
