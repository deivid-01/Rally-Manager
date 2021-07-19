export const setMapCenter = (first_item,last_item) => {
    
    return {
        lat:(first_item.latitude+last_item.latitude)/2,
        lng:(first_item.longitude+last_item.longitude)/2
    }
}

export const updateMapCenter = (map,point,zoom=16) =>  map.flyTo([point.latitude,point.longitude], zoom);
    
  
