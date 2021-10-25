import * as React from 'react';
import './join-us-card.scss';

import { MdTextsms } from 'react-icons/md'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const JoinUsCard = () => {
    return (
      <div class="join-us-card">
        <Card sx={{ 
          maxWidth: 275,
          textAlign: "left"
          }}>
          <CardMedia
            component="img"
            height="150"
            image="https://i.ibb.co/BP3MmTn/Screenshot-2021-10-08-14-13-58.png"
            alt="Opps"
          />
          <CardContent sx={{
            padding: '11px'
          }}>
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
            <Button size="small">SUBSCRIBE</Button>
          </CardActions>
        </Card>
      </div>)
}

export default JoinUsCard;