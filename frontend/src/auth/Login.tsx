import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError(null);
    try {
      console.log(values);
      form.reset();
    } catch (error) {
      setError(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 mx-4"
        >
          <div className="mb-2 text-center">
            <h1 className="font-extrabold text-3xl text-gray-800">
              Welcome to SureEats
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Sign in to your account
            </p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mt-[-1]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="yourname@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt[-1]">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold text-gray-700">
                    Password
                  </FormLabel>

                  <Input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-4">
            {loading ? (
              <Button
                type="submit"
                className="w-full bg-orange hover:bg-hoverOrange text-pretty text-md focus:outline-none focus:border-none"
                disabled
              >
                <Loader2 className="animate-spin" size={4} />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-orange hover:bg-hoverOrange text-pretty text-md focus:outline-none focus:border-none"
              >
                Login
              </Button>
            )}
          </div>
          <Separator />
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500">
              Signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
