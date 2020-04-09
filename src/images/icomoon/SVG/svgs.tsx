import React from 'react';
import { G, Path } from 'react-native-svg';

// Each nameValuePair can be:
// * Name: <Svg />; or
// * Name: { svg: <Svg />, viewBox: '0 0 50 50' }

export default {
    Report: {
        svg: <G><Path d="M30.874 6.689l-6.849-6.421c-0.184-0.172-0.431-0.269-0.688-0.269h-17.315c-2.021 0-3.665 1.569-3.665 3.498v25.004c0 1.929 1.644 3.498 3.665 3.498h21.482c2.020 0 3.665-1.569 3.665-3.498v-21.144c0-0.252-0.106-0.493-0.294-0.669zM24.319 3.172l3.465 3.249h-3.153c-0.172 0-0.312-0.134-0.312-0.298v-2.95zM27.503 30.125h-21.482c-0.937 0-1.7-0.728-1.7-1.623v-25.004c0-0.895 0.763-1.623 1.7-1.623h16.333v4.248c0 1.198 1.021 2.173 2.277 2.173h4.572v20.206c0 0.895-0.763 1.623-1.7 1.623z"></Path>
        <Path d="M23.581 14.875h-13.845c-0.542 0-0.982 0.42-0.982 0.938s0.44 0.937 0.982 0.937h13.845c0.542 0 0.982-0.42 0.982-0.937s-0.44-0.938-0.982-0.938z"></Path>
    <Path d="M9.736 20.5h11.289c0.542 0 0.982-0.42 0.982-0.937s-0.44-0.937-0.982-0.937h-11.289c-0.542 0-0.982 0.42-0.982 0.937s0.44 0.937 0.982 0.937z"></Path>
    <Path d="M22.387 22.375h-12.651c-0.542 0-0.982 0.42-0.982 0.937s0.44 0.938 0.982 0.938h12.651c0.542 0 0.982-0.42 0.982-0.938s-0.44-0.937-0.982-0.937z"></Path>
    </G>,
         viewBox: '0 0 120 120',
    },
    UserPlus : {
        svg : <G>
            <Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615"  d="M20.513 28v-2.667c0-1.414-0.54-2.771-1.502-3.771s-2.266-1.562-3.626-1.562h-8.974c-1.36 0-2.664 0.562-3.626 1.562s-1.502 2.357-1.502 3.771v2.667"></Path>
<Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615"  d="M10.897 14.667c2.832 0 5.128-2.388 5.128-5.333s-2.296-5.333-5.128-5.333c-2.832 0-5.128 2.388-5.128 5.333s2.296 5.333 5.128 5.333z"></Path>
<Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615"  d="M25.641 10.667v8"></Path>
<Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615"  d="M29.487 14.667h-7.692"></Path>

        </G>,
        viewBox: '0 0 120 120',
    },
    Profile : {
        svg : <G>
            <Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.3704"  d="M25.679 28v-2.667c0-1.415-0.541-2.771-1.504-3.771s-2.27-1.562-3.632-1.562h-10.272c-1.362 0-2.668 0.562-3.632 1.562s-1.504 2.357-1.504 3.771v2.667"></Path>
<Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.3704"  d="M15.407 14.667c2.836 0 5.136-2.388 5.136-5.333s-2.299-5.333-5.136-5.333c-2.836 0-5.136 2.388-5.136 5.333s2.299 5.333 5.136 5.333z"></Path>

            {/* <Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615"  d="M25.641 10.667v8"></Path> */}
{/* <Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615"  d="M29.487 14.667h-7.692"></Path> */}

        </G>,
        viewBox: '0 0 120 120',
    },

    User : {
        svg : <G>
            <Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4"  d="M21.827 28v-2.667c0-1.415-0.541-2.771-1.504-3.771s-2.27-1.562-3.632-1.562h-10.272c-1.362 0-2.668 0.562-3.632 1.562s-1.504 2.357-1.504 3.771v2.667"></Path>
<Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" d="M11.556 14.667c2.836 0 5.136-2.388 5.136-5.333s-2.299-5.333-5.136-5.333c-2.836 0-5.136 2.388-5.136 5.333s2.299 5.333 5.136 5.333z"></Path>
<Path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4"  d="M29.531 28v-2.667c-0.001-1.182-0.38-2.33-1.077-3.264s-1.673-1.601-2.775-1.896"></Path>
<Path fill="none"  stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4"  d="M20.543 4.173c1.105 0.294 2.084 0.961 2.783 1.896s1.079 2.086 1.079 3.27-0.38 2.335-1.079 3.27c-0.699 0.935-1.678 1.603-2.783 1.896"></Path>

        </G>,
          viewBox: '0 0 120 120',
    },
    OrderSheetClose:{
        svg:<G>
            <Path d="M21.75 7.25L7.25 21.75" stroke="#404243" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.25 7.25L21.75 21.75" stroke="#404243" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        </G>,
         viewBox: '0 0 120 120',
    },
    OrderSheetUpdate:{
        svg:<G>
            <Path d="M13.4584 2.62502C13.6663 2.39521 13.9131 2.21291 14.1848 2.08853C14.4565 1.96416 14.7477 1.90015 15.0417 1.90015C15.3358 1.90015 15.6269 1.96416 15.8986 2.08853C16.1703 2.21291 16.4171 2.39521 16.625 2.62502C16.833 2.85483 16.9979 3.12766 17.1104 3.42793C17.223 3.72819 17.2809 4.05002 17.2809 4.37502C17.2809 4.70003 17.223 5.02185 17.1104 5.32211C16.9979 5.62238 16.833 5.89521 16.625 6.12502L5.93754 17.9375L1.58337 19.25L2.77087 14.4375L13.4584 2.62502Z" stroke="#F1F6FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </G>,
        viewBox: '0 0 120 120',
    }
    
}