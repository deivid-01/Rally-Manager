import React from 'react'
import {Marker} from 'react-leaflet'
import {IconLocation} from './IconLocation'

function Markers()
{
    return(
        <Marker
            position={{
                lat:'6.2005886',
                lng:'-75.6174056'
            }}
          icon={IconLocation}
        />
    )

}

export default  Markers;