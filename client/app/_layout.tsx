import { View, Text } from 'react-native'
import React from 'react'
import "../global.css";

const  layout = () => {
  return (
    <View className='items-center flex h-screen w-screen justify-center bg-purple-500'>
      <Text className='text-white'>layout</Text>
    </View>
  )
}

export default layout