import { formatDistanceToNow, parseISO } from 'date-fns'
export const TimeAgo = ({timeStamp}) => {
  let timeAgo = ''
  if(timeStamp){
    const date=parseISO(timeStamp)
    const timePeriod=formatDistanceToNow(date)
    timeAgo=`${timePeriod} ago`
  }
  
  return (
    <span title={timeStamp} className="text-sm text-end">
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}