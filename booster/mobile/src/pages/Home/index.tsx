import React, { useState, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native'

interface IBGEUFResponse {
  sigla: string,
  nome: string,
}

interface uf {
  label: string,
  value: string,
}

const Home = () => {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')

  const cityRef = useRef(null)

  const navigation = useNavigation()

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <Main>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Description>
          </View>
        </Main>

        <Footer>
          <Input
            placeholder="Digite a UF"
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            returnKeyType="next"
            value={uf}
            onChangeText={setUf}
            onSubmitEditing={() => cityRef.current.focus()}
          />
          <Input
            placeholder="Digite a Cidade"
            autoCorrect={false}
            value={city}
            onChangeText={setCity}
            ref={cityRef}
            onSubmitEditing={handleNavigateToPoints}
          />

          <Button onPress={handleNavigateToPoints}>
            <ButtonIcon>
              <Feather name="arrow-right" color="#FFF" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;

const Container = styled.ImageBackground`
  flex: 1;
  padding: 32px;
`

const Main = styled.View`
  flex: 1;
  justify-content: center;
`

const Footer = styled.View``

const Select = styled.View``

const ButtonIcon = styled.View`
    height: 60px;
    width: 60px;
    background-color: rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
`

const Input = styled.TextInput`
  height: 60px;
  background-color: #FFF;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 24px;
  font-size: 16px;
`

const ButtonText = styled.Text`
    flex: 1;
    justify-content: center;
    text-align: center;
    color: #FFF;
    font-family: 'Roboto_500Medium';
    font-size: 16px;
`

const Button = styled(RectButton)`
  background-color: #34CB79;
  height: 60px;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
`

const Title = styled.Text`
  color: #322153;
  font-size: 32px;
  font-family: 'Ubuntu_700Bold';
  max-width: 260px;
  margin-top: 64px;
`

const Description = styled.Text`
  color: #6C6C6C;
  font-size: 16px;
  margin-top: 16px;
  font-family: 'Roboto_400Regular';
  max-width: 260px;
  line-height: 24px;
`
