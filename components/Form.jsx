"use client"
import Login from "@app/(auth)/page";
import Register from "@app/(auth)/register/page";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react"

const Form = ({type}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const router = useRouter()
      const onSubmit = async (data) => {
        if (type === "register") {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            // Check the response status
            if (res.ok) {
                router.push("/");
            } else {
                // If the response is not ok, check the response body for error messages
                const errorData = await res.json(); // Assuming the API returns a JSON error message
                toast.error(errorData.message || "Something went wrong");
            }
        }

        if (type === "login") {
            const res = await signIn("credentials", {
              ...data,
              redirect: false,
            })
      
            if (res.ok) {
              router.push("/chats");
            }
      
            if (res.error) {
              toast.error("Invalid email or password");
            }
          }
    };
    
      
  return (
    <div cllassName="auth">
      <div className="content" >
        <img src="/assets/JOIN.png" alt="logo" className="logo" />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
            <div>
              <input
              defaultValue=""
                {...register("username", {
                    required: "Username is required ",
                    validate: (value) => {
                        if (
                            value.length < 3 
                        ) {
                            return "Username must be at least 3 charaacters"
                        }
                    }
                })}
                type="text"
                placeholder="Enter Username"
                className="input-field"
              />
              <PersonOutlined sx={{ color: "#FFFFFF" }} />
            </div>
            {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
            )}
            </div>
          )}
          <div>
          <div className="input">
            <input
            defaultValue=""
            {...register("email", { required: "Email is required"})}
              type="email"
              placeholder="Enter Your Email"
              className="input-field"
            />
            <EmailOutlined sx={{ color: "#FFFFFF" }} />
          </div>
          {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
          <div className="input">
            <input
            defaultValue=""
            {...register("password",
             { required: "Password is required", 
            validate: (value) => {
                if(value.length < 5 || !value.match(/[!@#$%^&*()_+{}\[\]:;,.?~\\/-]/)) {
                    return "Password must be at least 5 characters and contain at least one special charcter"

                }
            }})}
              type="password"
              placeholder="Enter Password"
              className="input-field"
            />
            <LockOutlined sx={{ color: "#FFFFFF" }} />
          </div>
          {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="button">
            {type === "register" ? "Register" : "Login"}
          </button>

          {type === "register" ? (
            <Link href="/" className="link">
              <p className="text-center">Already have an account? Login here</p>
            </Link>
          ) : (
            <Link href="/register" className="link">
              <p className="text-center">
                Do not have an account? Register here
              </p>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
