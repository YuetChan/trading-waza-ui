import React, { useState } from 'react';
import './join-us-card.scss';

import { MdTextsms } from 'react-icons/md'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Typography from '@mui/material/Typography';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import SubscribeService from '../../services/subscribe-service'

const SubscribeState = {
	WAITING: "waiting",
	ENTER: "enter",
}

const JoinUsCard = () => {
  const [subscribeState, setSubscribeState] = useState(SubscribeState.ENTER);
  const [phone, setPhone] = useState('');

  const [openSubscribe, setOpenSubscribe] = React.useState(false);

  const handleOpenSubscribe = () => { setOpenSubscribe(true); };
  const handleCloseSubscribe = () => { 
    setSubscribeState(SubscribeService.ENTER);
    setOpenSubscribe(false); 

    setPhone('');
  };

  const handleSubmitSubscribe = async (event) => {
    event.preventDefault();
    setSubscribeState(SubscribeState.WAITING);

    try{
      const res = await SubscribeService.subscribeToPhoneList('1' + phone);

      const msg = res.data.message;
      if(msg.includes('succeeded')) {
        setSubscribeState(SubscribeService.ENTER);
        setOpenSubscribe(false); 

        handleOpenVerify();
      }else {
        window.confirm('Subscribe failed.\nAlready subscribed.')
      }
    }catch (err) {
      window.confirm('Subscribe failed.\nOpps, something is wrong.')
      console.log(err);
    }

    setSubscribeState(SubscribeState.ENTER);
  };

  const [verifyState, setVerifyState] = useState(SubscribeState.ENTER);
  const [codeCache, setCodeCache] = React.useState('');

  const [openVerify, setOpenVerify] = React.useState(false);

  const handleOpenVerify = () => { setOpenVerify(true); }
  const handleCloseVerify = () => { 
    setOpenVerify(false); 

    setCodeCache('');
    setPhone('');
  };

  const handleResendVerify = async (event) => {
    event.preventDefault();
    setVerifyState(SubscribeService.WAITING);

    try{
      const res = await SubscribeService.subscribeToPhoneList('1' + phone);

      console.log(res);
      const msg = res.data.message;
      if(!msg.includes('succeeded')) {
        window.confirm("Resend failed.\nOpps, something is wrong.");
      }
      console.log('called');
    }catch (err) {
      window.confirm("Resend failed.\nOpps, something is wrong.");
      console.log(err);
    }

    setVerifyState(SubscribeService.ENTER);
  }

  const handleChangeVerify = (event) => {
    const value = event.target.value;

    const isNum = value.match(/^[0-9]+$/) != null;
    const isMaxLength = value.length > 6;
    if(isMaxLength) {
      event.target.value = codeCache;
    }else {
      if(isNum) {
        setCodeCache(value);
      }else {
        event.target.value = codeCache;
      }
    }
  }

  const handleSubmitVerify = async (event) => {
    event.preventDefault();
    setVerifyState(SubscribeService.WAITING);

    try{
      const res = await SubscribeService.verifyPhone('1' + phone, codeCache)

      const status = res.data.status;
      const msg = res.data.message;
      console.log(res);
      if(status === 201 || msg.includes('confirmed')) {
        window.confirm('Phone Verified');

        setOpenVerify(false); 
        setCodeCache('');
      }else {
        window.confirm('Verification failed.\nIncorrect code.');
      }
      console.log('called');
    }catch (err) {
      window.confirm('Verification failed.\nOpps, something is wrong.');
      console.log(err);
    }

    setVerifyState(SubscribeService.ENTER);
  };

  return (
    <div class="join-us-card">
      <Card sx={{maxWidth: 273, textAlign: "left"}}>
        <CardMedia
          component="img"
          image="https://i.ibb.co/LkDxCyH/Screenshot-2021-10-26-21-36-19.png"
          alt="Opps"
          height="170"
        />
        <CardContent sx={{padding: '11px'}}>
          <div class="join-us-card__title">
            <h4>Waza SMS</h4>
            &nbsp;&nbsp;
            <div class="join-us-card__title__icon">
              <MdTextsms/>
            </div>
          </div>
          <Typography variant="body2" color="text.secondary">
            Subscribe to Waza SMS for daily update notification
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpenSubscribe}>SUBSCRIBE</Button>
        </CardActions>
      </Card>

      <Dialog open={openSubscribe} onClose={handleCloseSubscribe}>
        <form onSubmit={handleSubmitSubscribe}>
          <DialogTitle>Subscribe (Only available for US number)</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to daily update notification, please enter your phone number here. 
              As soon as latest data has been processed, you will be notified through SMS.
            </DialogContentText>
            <br></br>
            <div className="join-us-card__phone-input-wrapper">
              <div className="join-us-card__phone-input-wrapper__phone-input-row">
                <PhoneInput
                  country={'us'} onlyCountries={['us']}
                  disableDropdown={true} disableCountryCode={true}
                  placeholder="(702) 123-4567"
                  value={phone} onChange={setPhone}
                />
              </div>
              &nbsp;&nbsp;&nbsp;
              <div 
                className="join-us-card__phone-input-wrapper__phone-input-row__loader" 
                hidden={subscribeState !== SubscribeState.WAITING}>
                <CircularProgress size={35}/>
              </div>  
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSubscribe}>Cancel</Button>
            <Button type="submit" disabled={phone.length < 10}>Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openVerify} onClose={handleCloseSubscribe}>
        <form onSubmit={handleSubmitVerify}>
          <DialogTitle>Verify Phone Number</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To verify phone number for subscription, please enter the 6-digit verification code below.
            </DialogContentText>
            <br></br>
            <div className="join-us-card__code-input-wrapper">
              <div className="join-us-card__code-input-wrapper__code-input-row">
                T- &nbsp;&nbsp;
                <input
                  onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                  }}
                  className="join-us-card__code-input-wrapper__code-input-row__code-input"
                  onChange={handleChangeVerify}
                />
              </div>
              &nbsp;&nbsp;&nbsp;
              <div 
                  className="join-us-card__code-input-wrapper__code-input-row__loader"
                  hidden={verifyState !== SubscribeState.WAITING}>
                <CircularProgress size={35}/>
              </div>  
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseVerify}>Cancel</Button>
            <Button onClick={handleResendVerify}>Resend</Button>
            <Button type="submit" disabled={codeCache.length < 6}>Verify</Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>)
}

export default JoinUsCard;