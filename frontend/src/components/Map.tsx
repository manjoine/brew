import React from 'react'
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'

interface mapProp {
  coordinates: {
    lat: number
    lng: number
    name: string
  }
}
const containerStyle = {
  width: '90%',
  minHeight: '400px',
  margin: '20px',
}

const Map: React.FC<mapProp> = ({ coordinates, ...props }) => {
  return (
    <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_API_KEY || ''}>
      <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={15}>
        <MarkerF
          icon={{
            path: 'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
            fillColor: 'green',
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: 'gold',
            strokeWeight: 3,
          }}
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          title={coordinates.name}
          label={coordinates.name}
        />
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default React.memo(Map)
