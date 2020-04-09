import { NavigationActions } from 'react-navigation';

let navigator;

export function setNavigator(nav) {
   navigator = nav;
}

export function navigate(routeName, params) {
   if (navigator) {
      navigator.dispatch(NavigationActions.navigate({routeName, params}));
   }

}
export function navigateReset(routeName, params) {
    if (navigator) {
    
       navigator.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName,params }),
        ],
      }));
    }
 
 }


 export default {
   navigate,
   setNavigator,
 };
 
