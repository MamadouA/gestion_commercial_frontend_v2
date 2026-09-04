import { Button, Field, Input, Spinner, Text } from "@fluentui/react-components";
import { EyeOff20Filled, PersonRegular } from "@fluentui/react-icons";
import { Eye20Filled } from "@fluentui/react-icons/fonts";
import { useEffect, useState } from "react";
import { useAuthStore } from "./auth.store";
import { useNavigate } from "react-router";
import type { SignInType } from "./auth.types";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "./auth.api";

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);

    const authStore = useAuthStore();
    const navigateTo = useNavigate();

    const {
        handleSubmit,
        formState: { errors, isValid },
        control
    } = useForm<SignInType>({ mode: "onSubmit" });

    // -
    const { isPending, isError, mutateAsync: authenticationMutation } = useMutation({
        mutationFn: authenticate,
        onSuccess: (data) => {
            authStore.login(data.user, data.token);
            navigateTo("/dashboard");
        }
    });

    // -
    useEffect(() => {
        if(authStore.isLoggedIn) {
            navigateTo("/dashboard");
        }
    }, [authStore.isLoggedIn]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col gap-7 border p-14 border-slate-200 rounded-sm shadow-sm">
                <Text as="h1" size={400}><PersonRegular /> Se connecter à <span className="font-bold italic">_Kinetix</span></Text>
                <form className="flex flex-col gap-5 w-[30vw]" onSubmit={handleSubmit((data) => authenticationMutation(data))}>
                    
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({field}) => 
                            <Field label='Email' size="large" validationState={errors.email ? "error" : "none"}>
                                <Input placeholder="Entrez votre email" {...field}/>
                            </Field>
                        }
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({field}) => 
                            <Field label='Mot de passe' size="large" validationState={errors.password ? "error" : "none"}>
                                <Input type={showPassword ? "text" : "password"} placeholder="Entrez votre mot de passe" {...field} contentAfter={showPassword ? <Eye20Filled className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <EyeOff20Filled className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}/>
                            </Field>
                        }
                    />
                    
                    {
                        isError && (
                            <span className="text-red-400">Email ou mot de passe incorrecte!</span>
                        )
                    }
                    <Button appearance="primary" type="submit" size="large" className="flex gap-2" disabled={(isPending || !isValid)}>
                        <Spinner size="extra-small" hidden={!isPending} />
                        <span>Connexion</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
