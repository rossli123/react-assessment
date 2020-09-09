// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   card: {
//     width: 250,
//     fontWeight: 800,
//     fontSize: 30,
//     marginLeft: 20,
//   },
// });
// export default function MesurementCard(props: any) {
//   let { metric, value } = props;
//   const classes = useStyles();

//   return (
//     <Card className={classes.card}>
//       <CardContent>
//         <Typography variant="h6" component="h6">
//           {metric}
//         </Typography>
//         <Typography variant="h3" component="h3">
//           {value}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }



// ---------------------------------------------------------------





import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 200,
    fontWeight: 900,
    fontSize: 30,
    marginLeft: 10,
  },
});

export default function MesurementCard(props: any) {
  let { metric, value } = props;

  console.log(props, 'props from card');
  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h6">
          {metric}
        </Typography>
        <Typography variant="h3" component="h3">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}