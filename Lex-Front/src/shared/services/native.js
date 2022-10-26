// This contains the Native Calls
// GPS , MIC , Camera
export const nativeOperations = {
    gps(success, fail){
        
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log('Position is ',position);
                const pos = {'lat':position.coords.latitude, 
                'lng':position.coords.longitude};
                success (pos);
            }, (err)=>{
                fail(err);
            });
            
    },
    mic(){

    }
}