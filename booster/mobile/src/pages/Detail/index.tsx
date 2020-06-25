import React, { useEffect, useState } from 'react'
import { Linking, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather, FontAwesome } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'
import api from '../../service/api'
import styled from 'styled-components/native'

interface DetailProps {
  point_id: number,
}

interface Data {
  point: {
    image: string,
    image_url: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
  }
  items: {
    title: string
  }[]
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data)

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as DetailProps

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data)
    })
  }, [])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta de resíduos`)
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email]
    })
  }

  if (!data.point) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <PointImage source={{ uri: data.point.image_url }} />
        <PointName>{data.point.name}</PointName>
        <PointItems>
          {
            data.items.map(item => item.title).join(', ')
          }
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>{data.point.city}, {data.point.uf}</AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>

        <Button onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  )
}

export default Detail

const Container = styled.View`
  flex: 1;
  padding: 32px;
  padding-top: 50px;
`

const Address = styled.View`
  margin-top: 32px;
`

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  padding-right: 32px;
  padding-bottom: 20px;
  padding-left: 32px;
  border-color: #999;
`

const PointImage = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  margin-top: 32px;
`

const Button = styled(RectButton)`
  width: 48%;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #34CB79;
`

const ButtonText = styled.Text`
  color: #FFF;
  margin-left: 8px;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
`

const PointName = styled.Text`
  color: #322153;
  margin-top: 24px;
  font-size: 28px;
  font-family: 'Ubuntu_700Bold';
`

const PointItems = styled.Text`
  color: #6C6C80;
  line-height: 24px;
  margin-top: 8px;
  font-size: 16px;
  font-family: 'Roboto_400Regular';
`

const AddressTitle = styled.Text`
  color: #322153;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`

const AddressContent = styled.Text`
  color: #6C6C80;
  line-height: 24px;
  margin-top: 8px;
  font-family: 'Roboto_400Regular';
`
