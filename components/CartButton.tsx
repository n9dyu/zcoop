import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from "@/constants";

const CartButton = () => {

    const totalItems = 10; 
  return (
    <TouchableOpacity className='' onPress={() => {}}>
      <Image source={images.bag} className="w-6 h-6 color-white" resizeMode="contain" />

      {totalItems > 0 && (
        <View className='cart-badge'>
            <Text className="text-xs text-black">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CartButton