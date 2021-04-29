var Polycircle = require('./Polycircle.js');

const analysisCtrl = {};

analysisCtrl.printExam = ()=>{
    console.log(Polycircle.vertices(latitude=31.611878, longitude=34.505351, radius=100, number_of_vertices=100));
}
/**
 * def create_circle(latitude,longitude,radius,number_points):
    polycircle = polycircles.Polycircle(latitude = latitude, longitude=longitude, radius=radius, number_of_vertices=number_points)
    points_list=list(polycircle.to_lat_lon())
    center = (latitude,longitude)
    #plt.scatter(*zip(*points_list))
    #plt.scatter(latitude,longitude)
    #plt.show()
    return points_list, center


    def verify_circle(latitude=0,longitude=0,points_circle=[],center=(0,0)):
    for i in points_circle:
        if(latitude-center[0]<i[0]-center[0]):
            if(longitude-center[1]<i[1]-center[1]):
                print('esta adentro')
                return True
            
    return 0
 */


module.exports = analysisCtrl;