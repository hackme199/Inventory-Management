#!/bin/bash

read -r -d '' encrypted_script << EOF2
U2FsdGVkX1+NcNQuR8i0mMPIl2f8MssIwVXh6Nv4nVzLBEuZbnSO9GNRBm8mOhw8
AxLGGc5lCvf4HSWZc11VWlAjAdkCGp+k0Oe/ioKwv76A+5dzLiKcSHEGgV6F7BlD
FMwKrVaMELdfG3KFGSmDszt5y/Qvzj4+jSn7c5M2N/qnLmAeFE0cyHGsHtTNbX12
EIyQ4/MivRRcyHVU9OuxofxeBdG6pUKYj99qveMtJTwfHGbTlXsVhL186YBdLwa1
iJOmAF56Y2iSwjz1fQ9/QeWFcDga2Bw0yt5rpV3g5blIOJu3WQ658Z3WCzZOo2Bf
AIhLOQz0us+TAgxGfolj++mGVarIBAP7XUwR4WRANYDPUJutHzAZ71TqRodG4lrL
4U0atHkhCDUztRrNjrBpfw==
EOF2

read -s -p "Enter script password: " password
echo
unencrypted_script=$(openssl aes-256-cbc -d -a -salt -in /dev/stdin -out /dev/stdout <<< "${encrypted_script}" -pass pass:"${password}" 2>/dev/null | tr -d '\000')
clear
checksum="$(echo "$unencrypted_script" | md5sum | awk '{ print $1 }')"
if [ "${checksum}" = "ce1312925594d918e9c1ca5b0273cf22" ]; then
    eval "${unencrypted_script}"
    exit 0
else
    echo "Wrong password inserted"
    exit 1
fi
