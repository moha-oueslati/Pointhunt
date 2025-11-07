import { useState } from 'react'
import { View, Button } from 'react-native';
export default function TaskInterface(){
    const [open, setOpen] = useState(false);
    const [num, setSwaped] = useState(0);

    const toggleDropDown = () => {
        setOpen((open) => !open);
    };
    const handleChange = (num2: number) => {
        setSwaped(num2);
        setOpen(false);
    };
    const getTitle = (num: number) => {
            switch(num){
                case 1:
                    return "Lag 1";
                case 2:
                    return "Lag 2";
                default:
                    return "Välj Lag";
            }
        };
    return(
        <>
            <View>
                <title>
                    Task 1
                </title>
            </View>
            <View>
                <Button onPress={() => {toggleDropDown()}} key={num} title={getTitle(num)}/>
                {open &&(
                    <View>
                        {num !== 1 ?(
                            <Button onPress={() => {handleChange(1)}} title='Lag 1'/>
                        ) : (
                            <Button onPress={() => {handleChange(0)}} title='Välj Lag'/>
                        )}
                        {num !== 2 ?(
                            <Button onPress={() => {handleChange(2)}} title='Lag 2'/>
                        ): (
                            <Button onPress={() => {handleChange(0)}} title='Välj Lag'/>
                        )}
                    </View>
                )}
            </View>
        </>
        
    );
}