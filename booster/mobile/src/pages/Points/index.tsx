import React from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import { SvgUri } from 'react-native-svg'
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants'
import styled from 'styled-components/native'

const Points = () => {
  const navigation = useNavigation()

  function handleNavigateBack () {
    navigation.goBack()
  }

  function handleNavigateToDetail () {
    navigation.navigate('Detail')
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: -26.6367819,
              longitude: -52.6804481,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <Marker
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude: -26.6367819,
                longitude: -52.6804481,
              }}
            >
              <MapMarkerContainer>
                <Image resizeMode='cover' source={{ uri:'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'}} />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </Marker>
          </Map>
        </MapContainer>
      </Container>


        <ItemsContainer>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <Item onPress={() => {}}>
              <SvgUri width={42} height={42} uri="http://192.168.0.105:3333/uploads/lampadas.svg" />
              <ItemTitle>Lâmpadas</ItemTitle>
            </Item>
            <Item onPress={() => {}}>
              <SvgUri width={42} height={42} uri="http://192.168.0.105:3333/uploads/lampadas.svg" />
              <ItemTitle>Lâmpadas</ItemTitle>
            </Item>
            <Item onPress={() => {}}>
              <SvgUri width={42} height={42} uri="http://192.168.0.105:3333/uploads/lampadas.svg" />
              <ItemTitle>Lâmpadas</ItemTitle>
            </Item>
            <Item onPress={() => {}}>
              <SvgUri width={42} height={42} uri="http://192.168.0.105:3333/uploads/lampadas.svg" />
              <ItemTitle>Lâmpadas</ItemTitle>
            </Item>
          </ScrollView>
      </ItemsContainer>
    </>
  )
}

export default Points

const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: ${Constants.statusBarHeight+20}px;
`

const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`

const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`

const MapMarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #34CB79;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`

const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`

const Item = styled.TouchableOpacity`
  height: 120px;
  width: 120px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF;
  border-color: #EEE;
  border-width: 2px;
  border-radius: 8px;
  padding-top: 20px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  margin-right: 8px;
`

const Image = styled.Image`
  width: 90px;
  height: 45px;
`


const Title = styled.Text`
  font-size: 20px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`

const Description = styled.Text`
  color: #6C6C80;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Roboto_400Regular';
`

const ItemTitle = styled.Text`
  font-family: 'Roboto_400Regular';
  text-align: center;
  font-size: 13px;
`

const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Roboto_400Regular';
  color: #FFF;
  font-size: 13px;
  line-height: 23px;
`
