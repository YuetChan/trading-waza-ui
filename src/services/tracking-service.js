import ReactGA from 'react-ga';

const initGA = () => {           
  ReactGA.initialize('UA-210903030-1'); 
}

const GAEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

const PageView = () => {  
  ReactGA.pageview(window.location.pathname); 
}

const TrackingService = { initGA, GAEvent, PageView };
export default TrackingService;