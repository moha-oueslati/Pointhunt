import { View, Text, TouchableOpacity } from 'react-native';

// Guest
export default function Navbar(){
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 0
        }}
        >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center'
            }}>{/*Denna knapp kanske behöver en bild*/}
                <TouchableOpacity><Text>Hem</Text></TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center'
            }}> {/*Denna knapp kanske behöver en bild*/}
                <TouchableOpacity><Text>Tabell</Text></TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center'
            }}> {/*Denna knapp kanske behöver en bild*/}
                <TouchableOpacity><Text>Ladda upp</Text></TouchableOpacity>
            </View><View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center'
            }}> {/*Denna knapp kanske behöver en bild*/}
                <TouchableOpacity><Text>Lista</Text></TouchableOpacity>
            </View><View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center'
            }}> {/*Denna knapp kanske behöver en bild*/}
                <TouchableOpacity><Text>Profil</Text></TouchableOpacity>
            </View>
        </View>
    );
}