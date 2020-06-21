import React from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather, FontAwesome } from '@expo/vector-icons'
import styled from 'styled-components/native'

const Detail = () => {
  const navigation = useNavigation()

  function handleNavigateBack() {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <PointImage source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }} />
        <PointName>Mercadão do João</PointName>
        <PointItems>Lâmpadas, Óleo de Cozinha</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>Santiago do Sul</AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>

        <Button onPress={() => {}}>
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
  padding-top: 20px;
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
