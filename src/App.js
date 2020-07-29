import React, { useState, useContext } from 'react';
import './App.css';

import { TableContainer, TableRow, TableCell, TableBody, Table, Paper, RadioGroup, FormControlLabel, Radio, Typography, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { withTranslation, Trans } from 'react-i18next'
import { DirectionContext } from './directioncontext';
import { DIRECTIONS } from 'react-with-direction/dist/constants';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';

import { useStyles } from './styles'

function App(props) {
  const [languageState, setLanguageState] = useState({ value: 'en' });
  const { state, dispatch } = useContext(DirectionContext);

  const onLanguageHandle = (event) => {
    let newLang = event.target.value;
    setLanguageState({ ...languageState, value: newLang })
    props.i18n.changeLanguage(newLang)

    dispatch({
      type: 'CHANGE_DIRECTION',
      payload: { direction: newLang === 'ar' ? DIRECTIONS.RTL : DIRECTIONS.LTR }
    });
  }



  const { t } = props;

  const classes = useStyles();

  const theme = createMuiTheme({
    direction: 'rtl',
    overrides: {
      //this is to override the text alignment inside the table component of material ui
      MuiTableCell: {
        root: {
          textAlign: state.direction === DIRECTIONS.RTL ? 'right' : 'left'
        }
      }
    }
  });

  return (
    <DirectionProvider direction={state.direction}>
      <ThemeProvider theme={theme}>
        <div className="App" dir={state.direction}>
  
          <RadioGroup aria-label="language" name="language" value={languageState.value} onChange={onLanguageHandle}>
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="ar" control={<Radio />} label="Arabic" />
          </RadioGroup>
  
          <Typography variant="h1"><Trans>Paragraph</Trans></Typography>
  
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell scope="row">
                    {t('author.title')}
                  </TableCell>
                  <TableCell>
                    {t('author.value')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    {t('description.title')}
                  </TableCell>
                  <TableCell>
                    {t('description.value')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </DirectionProvider>
  );

}

export default withTranslation()(App);
