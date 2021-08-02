import React from 'react'
import { connect } from 'react-redux'
import { Popup, Polygon } from 'react-leaflet'
import Location from './Location'
import { showLocationModal } from '../../redux/actions'

export const LocationList = ({ myloc, locations, showLocationModal }) => {
  var c="pink";
  return (
    <div>
      {myloc &&
        myloc.length &&
        myloc.map(loc => (
          <Polygon
            key={loc.id}
            positions={loc.geometry.coordinates[0]}
            color={scegliColore(loc)}>   
            <Popup>
              <Location location={loc.properties}/>
            </Popup>
          </Polygon>
        ))}
    </div>
  )
}
function scegliColore(locColor){
  if (parseInt(locColor.properties.residenti)<25000){
    return "green"
  }
  else if (parseInt(locColor.properties.residenti)>=25000 && parseInt(locColor.properties.residenti)<=40000){
    return "yellow"
  }
  else {
    return "red"
  }
}
const mapStateToProps = state => ({
  locations: Object.values(state.location),
})


const mapDispatchToProps = {showLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
