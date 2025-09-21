import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'


const SignIn = () => {

    const [isSubmitting, setIsSubmiting] = useState(false);
    const [form, setForm] = useState({email: '', password: ''});

    const submit = async () => {
        const { email, password } = form;

        if(!email || !password) return Alert.alert("Error", "Please enter valid email & password.")

            setIsSubmiting(true);

            try {
                await signIn({ email, password });

                router.push("/");
            } catch (error: any) {
                Alert.alert("Error", error.message);
            } finally {
                setIsSubmiting(false);
            }
    }    


  return (
    <View className='gap-10 bg bg-white rounded-lg p-5 mt-5'>
        <CustomInput
            placeholder='Enter your email'
            value={form.email}  
            onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
            label="Email"
            keyboardType='email-address'
        />
        <CustomInput
            placeholder='Enter your password'
            value={form.password}  
            onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
            label="Password"
            secureTextEntry={true}
        />
        <CustomButton 
            title='Sign In'
            isLoading={isSubmitting}
            onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2 font-coolvetica'>
            <Text className="base-regular text-gray-400 font-coolvetica text-xl">
                Don't have an account?
            </Text>
            <Link href='/sign-up' className='base-bold text-red font-coolvetica text-xl'>
                Sign Up
            </Link>
        </View>
    </View>
  )
}

export default SignIn