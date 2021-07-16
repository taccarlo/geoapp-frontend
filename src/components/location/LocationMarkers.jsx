import React from 'react'
import { connect } from 'react-redux'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import parco from '../../assets/icons/locations/parco.svg'
import farmacia from '../../assets/icons/locations/farmacia.svg'
import Location from './Location'
import { showLocationModal } from '../../redux/actions'
const parcoIcon = L.icon({
  iconUrl: parco,
  iconSize: [30, 30],
})

const farmaciaIcon = L.icon({
  iconUrl: farmacia,
  iconSize: [30, 30],
})

const locationConfig = {
  parco: {
    icon: parcoIcon,
  },
  farmacia: {
    icon: farmaciaIcon,
  },
}


export const LocationList = ({ locations, showLocationModal }) => {

  return (
    <div>
      {locations.length &&
        locations.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            eventHandlers={{
              click: () => showLocationModal({locationClicked:loc}),
            }}
            icon={locationConfig[loc.category.denominazione].icon}
          >
            <Popup>
              <Location location={loc} />
            </Popup>
          </Marker>
        ))}
    </div>
  )
}

const mapStateToProps = state => ({
  locations: Object.values(state.location),
})

const mapDispatchToProps = {showLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
