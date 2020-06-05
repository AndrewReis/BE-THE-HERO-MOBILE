import React, {useEffect, useState} from 'react'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import style from './style'
import api from '../../services/api'
import logoImg from '../../../assets/logo.png'


export default function Incidents(){
    const [ incidents, setIncidents ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    
    
    const navigation = useNavigation()




    async function loadIncidents(){

        if(loading){
            return
        }
        if(total > 0 && incidents.length == total){
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })
        
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage( page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    })




    function navigationToDetail(incident){
        navigation.navigate('Detail', {incident} )
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={style.title}>
                Bem Vindo
            </Text>
            <Text style={style.description}>
                Escolha um caso e salve o dia.
            </Text>


            <FlatList 
                data={incidents}
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={ ({item})=> (
                    <View style={style.incident} > 
                        <Text style={style.incidentProperty} >ONG:</Text>
                        <Text style={style.incidentValue} > {item.name} </Text>
                        <Text style={style.incidentProperty} >CASO:</Text>
                        <Text style={style.incidentValue}> {item.title} </Text>
                        <Text style={style.incidentProperty} >VALOR</Text>
                        <Text style={style.incidentValue} > { Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.value) } </Text>
                        <TouchableOpacity style={style.detailButton}
                            onPress={ () => navigationToDetail(incidents) } >
                                <Text style={style.detailButtonText} >Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color= "#e02041" />
                        </TouchableOpacity>
                    </View>
                ) }

            
            />
        </View>
    )
}