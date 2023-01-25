import React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
    borderColor: '#ffb549',
    color: '#ffb549',
    fontWidth: 600,
    marginBottom: '8px',
    textTransform: 'none',
    "&:hover": {
        borderColor: 'transparent',
        backgroundColor: "#ffb549",
        color: '#fff'
    }
})

const Answer = (props) =>{
    return(
        <CustomButton variant="outlined" onClick={() => props.select(props.content, props.nextId)}>
            {props.content}
        </CustomButton>
    )
}

export default Answer