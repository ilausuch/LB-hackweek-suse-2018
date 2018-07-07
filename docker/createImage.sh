docker pull ubuntu
docker build -t suse_game:beta1 .
docker rm -f suse_game 2>/dev/null
cd ..
current_dir=$(pwd)
echo "Mount point $current_dir/game"
docker run --name suse_game -di -p 10080:80 -v $current_dir/game:/var/www suse_game:beta1
