UPDATE dev_timelogs
SET out_time=CURRENT_TIMESTAMP,
    total_time=CURRENT_TIMESTAMP-in_time,
    value=(EXTRACT(epoch FROM CURRENT_TIMESTAMP - in_time) / 3600 ) * rate
WHERE id=$1;