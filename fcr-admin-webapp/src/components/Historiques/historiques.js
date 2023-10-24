import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HistoriqueContact from './HistoriqueContact';
import HistoriqueUtilisateur from './HistoriqueUtilisateurs';
import HistoriqueHabillement from './HistoriqueHabillement';
import HistoriqueSousCategory from './HistoriqueSousCategory';
import HistoriqueCategory from './HistoriqueCatégories';
import HistoriqueAbonnement from './HistoriquesAbonnement';
import HistoriqueParrain from './HistoriqueParrain';
import HistoriqueRDV from './HistoriqueRDV';
import HistoriqueCoach from './HistoriqueCoach';
import HistoriqueInventaire from './HistoriqueInventaire';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props; 
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function Historiques() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="profile_page">
    <div className="col-left"></div>
    <div className="col-right">
    <div> 
    <Box sx={{maxWidth: { xs: 1100, sm: 1100 }, marginTop:"50px" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example">
          <Tab label="Contact" {...a11yProps(0)} />
          <Tab label="Utilisateur" {...a11yProps(1)}/>
          <Tab label="Habillement" {...a11yProps(2)} />
          <Tab label="Catégorie" {...a11yProps(3)} />
          <Tab label="SousCatégorie" {...a11yProps(4)} />
          <Tab label="Abonnement" {...a11yProps(5)} />
          <Tab label="Parrain" {...a11yProps(6)} />
          <Tab label="Rdv" {...a11yProps(7)} />
          <Tab label="Coach" {...a11yProps(8)} />
          <Tab label="Inventaire" {...a11yProps(9)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <HistoriqueContact />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <HistoriqueUtilisateur />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <HistoriqueHabillement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <HistoriqueCategory />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <HistoriqueSousCategory />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <HistoriqueAbonnement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <HistoriqueParrain />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}  >
       <HistoriqueRDV />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        <HistoriqueCoach />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
        <HistoriqueInventaire />
      </CustomTabPanel>
    </Box></div></div></div>
  )
}

export default Historiques