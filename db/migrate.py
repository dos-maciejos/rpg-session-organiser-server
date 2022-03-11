import subprocess

migration = "./create_dates.sql"

subprocess_instance = subprocess.Popen(f"/usr/local/opt/mysql-client/bin/mysql -h g0gpkbmi9d63.eu-west-3.psdb.cloud -u btr3lwg3pfp5 -ppscale_pw_iKdAHXIRU9IT0LaILdbSuXs_Q-u8nQPswcAQjlop8Bc --ssl-mode=VERIFY_IDENTITY --ssl-ca=/etc/ssl/cert.pem < {migration}", shell=True)
