import React from 'react'
import { connect } from 'react-redux'
import { Marker, Popup } from 'react-leaflet'

import Location from './Location'

export const LocationList = ({ locations }) => {
  return (
    <div>
      {locations.length &&
        locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <Location location={loc} />
            </Popup>
          </Marker>
        ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  locations: state.location.locations,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
