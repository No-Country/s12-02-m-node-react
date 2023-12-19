import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const Map = ({coordinates = [-34.6144420654301,-58.4458763250916]}) => {
    let position = coordinates
    return (
        <MapContainer className='h-60 w-full rounded-2xl z-0' center={position} zoom={8} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
    )
}

export default Map