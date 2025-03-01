
 # Define the log file                                       
 logFile="recovery_log.txt"
 
 # Path to Git executable (adjust this based on your system)
 gitPath="/c/Program Files/Git/bin/git.exe"  # Adjust for your actual Git path

 # List of hashes you provided
 hashes=(
     "2394171959cebd62e17beaf0f3cade9e51982435"
     "bb549087065f1349002555988b7580b541324cf0"
     "c3ec7ce0f6f058043ba80c41a539d91050d3d71e"
     "039d96a1c4adebbb9e9177050afc03d1721d7c01"
     "195168613605aaf91f5028d4d2700290d9d64688"
     "2e09b0f16b453ee8836b3eca7880cc3f96e4c852"
     "4c9d04fa69c94cab8b394eff7b917642785e4a24"
     "cba5cc1d3973b3aa179d848c735bcd223e68fa94"
     "d005a6a2e75f4cc60b3355cd102cf5ad514a0cfd"
     "d2150fef2bc8ef6a639dc2d559000dad37bb52c2"
     "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
     "009e8a5745215a9bc41c0b6df14c75d4457ecdbc"
     "0b1ad7e48e7b05420f7aa87fc9113e425f815196"
     "2f1e630f2a0ab8a4bc8b333a019a6abc99e85d4b"
     "98e6cec8f1c35d6f2a10c3e2c195c5fb2fcbff28"
     "f86af2d330bb0b8aa74ec6d707560db301e51306"
     "3fff958be16f11bea652e454c18fffe569d5aac7"
     "6b9b8465cc92eebf1d59b96608624e1f0d4523d1"
     "7ec34bec5ed35d69f808917c380e71dd0d590611"
     "b26b7cfe54c8eb953cfc36cdf931caeef031ba83"
     "b7b7d71608b7fc679b8651f040a7a8a4bc96fb44"
 )

 # Loop through each hash and log
 for hash in "${hashes[@]}"; do
     echo "Processing hash: $hash"

     # Log the hash itself before the content
     echo "Hash: $hash"  $logFile

     # Get content using Git directly
     content=$($gitPath cat-file blob $hash)
 
     if [ -n "$content" ]; then
         # Log the content
         echo "$content"  $logFile
     else
         echo "No content found for hash $hash"  $logFile
     fi

     # Log separator
     echo -e "\n----- End of $hash -----\n"  $logFile
 done

 echo "Logging complete. Check $logFile for results."
 #!/bin/bash

 # Define the log file
 logFile="recovery_log.txt"

 # Path to Git executable (adjust this based on your system)
 gitPath="/c/Program Files/Git/bin/git.exe"  # Adjust for your actual Git path

 # List of hashes you provided
 hashes=(
     "2394171959cebd62e17beaf0f3cade9e51982435"
     "bb549087065f1349002555988b7580b541324cf0"
     "c3ec7ce0f6f058043ba80c41a539d91050d3d71e"
     "039d96a1c4adebbb9e9177050afc03d1721d7c01"
     "195168613605aaf91f5028d4d2700290d9d64688"
     "2e09b0f16b453ee8836b3eca7880cc3f96e4c852"
     "4c9d04fa69c94cab8b394eff7b917642785e4a24"
     "cba5cc1d3973b3aa179d848c735bcd223e68fa94"
     "d005a6a2e75f4cc60b3355cd102cf5ad514a0cfd"
     "d2150fef2bc8ef6a639dc2d559000dad37bb52c2"
     "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
     "009e8a5745215a9bc41c0b6df14c75d4457ecdbc"
     "0b1ad7e48e7b05420f7aa87fc9113e425f815196"
     "2f1e630f2a0ab8a4bc8b333a019a6abc99e85d4b"
     "98e6cec8f1c35d6f2a10c3e2c195c5fb2fcbff28"
     "f86af2d330bb0b8aa74ec6d707560db301e51306"
     "3fff958be16f11bea652e454c18fffe569d5aac7"
     "6b9b8465cc92eebf1d59b96608624e1f0d4523d1"
     "7ec34bec5ed35d69f808917c380e71dd0d590611"
     "b26b7cfe54c8eb953cfc36cdf931caeef031ba83"
     "b7b7d71608b7fc679b8651f040a7a8a4bc96fb44"
 )

 # Loop through each hash and log
 for hash in "${hashes[@]}"; do
     echo "Processing hash: $hash"

     # Log the hash itself before the content
     echo "Hash: $hash"  $logFile

     # Get content using Git directly
     content=$($gitPath cat-file blob $hash)

     if [ -n "$content" ]; then
         # Log the content
         echo "$content"  $logFile
     else
         echo "No content found for hash $hash"  $logFile
     fi

     # Log separator
     echo -e "\n----- End of $hash -----\n"  $logFile
 done

 echo "Logging complete. Check $logFile for results."
