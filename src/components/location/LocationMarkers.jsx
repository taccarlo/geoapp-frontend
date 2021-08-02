import React from 'react'
import { connect } from 'react-redux'
import { Popup, Polygon } from 'react-leaflet'
import Location from './Location'
import { showLocationModal } from '../../redux/actions'

export const LocationList = ({ myloc, locations, showLocationModal }) => {
  return (
    <div>
      {myloc &&
        myloc.length &&
        myloc.map(loc => (
          <Polygon
            key={loc.id}
            positions={loc.geometry.coordinates[0]}>   
            <Popup>
              <Location location={loc.properties}/>
            </Popup>
          </Polygon>
        ))}
    </div>
  )
}

const mapStateToProps = state => ({
  locations: Object.values(state.location),
})


const mapDispatchToProps = {showLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
