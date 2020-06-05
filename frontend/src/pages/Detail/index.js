import React from 'react'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import style from './style'
import logoImg from '../../../assets/logo.png'

export default function Detail(){

    const navigation = useNavigation()
    const route = useRoute()
    
    const incident = route.params.incident
    
    const message = `Olá ${incident.name} estou entrando em contato....`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso: ${incident.title}`,
            recipients: ['andrew-reiis@outlook.com'],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55993151669&text=${message}`)

    }

    return (
        <View style={style.container}>
              <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={ navigateBack } >
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={style.incident}>
                <Text style={style.incidentProperty} >ONG:</Text>
                <Text style={style.incidentValue} > {incident.name} </Text>
                <Text style={style.incidentProperty} >CASO:</Text>
                <Text style={style.incidentValue}> {incident.title} </Text>
                <Text style={style.incidentProperty} >VALOR</Text>
                <Text style={style.incidentValue} > {incident.value} </Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}> Salve o dia!</Text>
                <Text style={style.heroTitle}> Seja o héroi desse caso.</Text>

                <Text style={style.heroDescription}> Entre em contato </Text>

                <View style={style.actions}>
                    <TouchableOpacity  style={style.action} onPress={sendWhatsapp} >
                        <Text style={style.actionText} > Whatsapp </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={style.action} onPress={ sendMail } >
                        <Text style={style.actionText} > E-mail </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}