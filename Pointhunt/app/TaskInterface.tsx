import { useState } from 'react'
import { View, Button } from 'react-native';
export default function TaskInterface(){
    const [open, setOpen] = useState(false);

    const toggleDropDown = () => {
        setOpen((open) => !open);
    };
    return(
        <>
            <View>
                <title>
                    Task 1
                </title>
            </View>
            <View>
                <Button onPress={setOpen((open) => !open)} className="dropbtn" title='Välj Lag'/>
                <View id="DropdownMenu">
                    <button className="Teambtn">Lag 1</button>
                </View>
            </View>
        </>
        
    );
}

function handleDrop(){

}