import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { TextContent, TextSubTitles } from '../../TextCustom'
import { Link } from 'expo-router'

export default function ItemProduct({ data, fondo, productReport}) {
    const filteredData = data.filter(item => 
        productReport.includes(item.title) // o item.id si trabajas con IDs
    )
    return (
     <View className="py-5 bg-white rounded-3xl gap-5 px-5">
        <TextSubTitles style={{ marginTop: 10, fontWeight: "bold" }}>Procedimientos recomendados:</TextSubTitles>
        <View className='flex-row flex-wrap gap-3 justify-between'>
            {
                filteredData.map((product) => (
                    <View key={product.id} className='w-44 pb-3 rounded-2xl' style={{backgroundColor: fondo}}>
                        <Link href={product.link} asChild>    
                            <Pressable className='justify-center items-center gap-3'>
                                <Image source={{uri: product.image}} className='w-44 h-40 rounded-2xl'/>
                                <TextSubTitles className="flex-wrap text-center">{product.title}</TextSubTitles>
                            </Pressable>
                        </Link>
                    </View>
                ))
            }
        </View>

    </View>
  )
}