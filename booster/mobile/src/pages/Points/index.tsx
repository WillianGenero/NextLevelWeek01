import React, { useEffect, useState} from 'react'
import { Alert, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import api from '../../service/api'
import styled from 'styled-components/native'

interface Item {
  id: number,
  title: string,
  image_url: string,
}

interface Point {
  id: number,
  name: string,
  image: string,
  latitude: number,
  longitude: number,
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const navigation = useNavigation()

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização')
        return
      }
      const location = await Location.getCurrentPositionAsync()

      setInitialPosition([location.coords.latitude, location.coords.longitude])
    }

    loadPosition()
  }, [])

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('/points', {
      params: {
        city: 'Santiago do Sul',
        uf: 'SC',
        items: [1]
      }
    }).then(response => {
      setPoints(response.data)
    })
  }, [])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id })
  }

  function handleSelectItems(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    alreadySelected >= 0
    ? setSelectedItems(selectedItems.filter(item => item !== id))
    : setSelectedItems([ ...selectedItems, id])
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta</Description>

        <MapContainer>
          {
            initialPosition[0] !== 0 && (
              <Map
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014,
                }}
              >
                {
                  points.map(point => (
                    <Marker
                      key={String(point.id)}
                      onPress={() => handleNavigateToDetail(point.id)}
                      coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude,
                      }}
                    >
                      <MapMarkerContainer>
                        <Image resizeMode='cover' source={{ uri: point.image }} />
                        <MapMarkerTitle>{point.name}}</MapMarkerTitle>
                      </MapMarkerContainer>
                    </Marker>
                  ))
                }
              </Map>
            )
          }
        </MapContainer>
      </Container>


      <ItemsContainer>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {
            items.map(item => (
              <Item
                key={String(item.id)}
                activeOpacity={0.6}
                onPress={() => handleSelectItems(item.id)}
                select={selectedItems.includes(item.id) ? true : false}
              >
                <ItemTitle>{item.title}</ItemTitle>
              </Item>
            ))
          }
        </ScrollView>
      </ItemsContainer>
    </SafeAreaView>
  )
}

export default Points

const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: 50px;
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

interface ItemProps {
  select: boolean,
}

const Item = styled.TouchableOpacity<ItemProps>`
  height: 120px;
  width: 120px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF;
  border-color: ${p => p.select ? `#34CB79` : `#FFF`};
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
