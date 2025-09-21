import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'


const SignUp = () => {

    const [isSubmitting, setIsSubmiting] = useState(false);
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const submit = async () => {
        const { name, email, password } = form;

        if(!name || !email || !password) return Alert.alert("Error", "Please enter valid email & password.")

            setIsSubmiting(true);

            try {
                await createUser({ email, password, name })

                Alert.alert("Success", "You have successfully signed up.");
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
            placeholder='Enter your full name'
            value={form.name}  
            onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
            label="Name"
        />
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
            title='Sign Up'
            isLoading={isSubmitting}
            onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2 font-coolvetica'>
            <Text className="base-regular text-gray-400 font-coolvetica text-xl">
                Already have an account?
            </Text>
            <Link href='/sign-in' className='base-bold text-red font-coolvetica text-xl'>
                Sign In
            </Link>
        </View>
    </View>
  )
}

export default SignUp