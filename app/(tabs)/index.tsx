import { FlatList, Text, View, Image, Pressable, Animated, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";

import "../global.css"
import { flavors, images } from "@/constants";
import CartButton from "@/components/CartButton";



export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateFlavor = (direction: "next" | "prev", newIndex: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === "next" ? -50 : 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(newIndex);

      // reset values
      fadeAnim.setValue(0);
      slideAnim.setValue(direction === "next" ? 50 : -50);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? flavors.length - 1 : currentIndex - 1;
    animateFlavor("prev", newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === flavors.length - 1 ? 0 : currentIndex + 1;
    animateFlavor("next", newIndex);
  };

  const currentFlavor = flavors[currentIndex];

  return (

    <SafeAreaView className="bg-white flex-1">
      <View>
        <Image source={images.header} className="absolute -top-6 left-0 w-full " resizeMode="contain" />
      </View>

      <View className="justify-between flex-row w-full px-5">
        <View className="flex-start">
          <TouchableOpacity>
            <Image source={images.menuwhite} className="w-7 h-7" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <CartButton/>
      </View>

      <Text className="text-red font-bop text-center text-7xl mt-[60px]">Discover</Text>
      <Text className="text-black font-coolvetica text-center text-3xl my-1">{currentFlavor.title}</Text>

      <View className="flex-row items-center justify-center mt-6">

        <Pressable onPress={handlePrev} className="p-2">
          <Image source={images.left} className="size-5" resizeMode="contain" />
        </Pressable>

        <View className="relative items-center justify-center">
          <Image source={images.flavorbg} className="w-2/3 aspect-square mt-7" resizeMode="contain" />

          <Animated.Image 
            source={currentFlavor.image} 
            style={{position: 'absolute', width:"95%", aspectRatio: 1, marginBottom: 90, opacity: fadeAnim, transform: [{ translateX: slideAnim }],}}
            resizeMode="contain"
          />
        </View>

        <Pressable onPress={handleNext} className="p-2">
          <Image source={images.right} className="size-5" resizeMode="contain" />
        </Pressable> 

      </View> 

      <View className="items-center mt-[-60px]">

        <Pressable className="w-20 h-20 rounded-full bg-white shadow-md items-center justify-center" style={{ elevation: 6 }}>
          <Image source={images.addtobag} className="w-8 h-8" resizeMode="contain" />
        </Pressable>

      </View>
        
      <Text className="text-black font-coolvetica text-center text-xl mt-5 px-8">{currentFlavor.details}</Text>  

      <View className="absolute bottom-16 left-8 items-center">
          <Image source={images.tags} className="w-100 h-45" resizeMode="contain" />
          <Text className="text-red font-coolvetica text-center text-xl absolute top-5 left-24">{currentFlavor.calories}</Text>
      </View>

    </SafeAreaView>
  );
}
