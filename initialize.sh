# #!/bin/bash
# # My first script
# #first run command 'chmod 755 initialize.sh' in the root of project
# #must also have heroku login credentials

# ######notes: will liekly have to figure out how to get env variables to update the nameof the app,

# #build frontend react
# echo "Making the React frontend Build"
# npm run build
# echo "...completed"

# PROJECT_NAME="$(npm run project-name)"
# STAGING_NAME="${PROJECT_NAME}-staging"
# echo "${STAGING_NAME}"


# #create app environments   ##################################
# #staging
echo "Creating staging environment..."
heroku create --remote staging
echo "...completed"

# #production
echo "Creating production environment..."
heroku create --remote production
echo "...completed"

# #  #add steps to rename##########################
# # #staging
# echo "Trying to rename staging environment with project name..."
# heroku apps:rename ${STAGING_NAME} --remote staging
# echo "...completed"

# # #production
# echo "Trying to rename production environment with project name..."
# heroku apps:rename ${PROJECT_NAME} --remote production
# echo "...completed"


#provision databases ##############################
#staging
echo "Provisioning database for staging environment..."
# heroku addons:create mongolab --remote staging
heroku addons:create jawsdb --remote staging

echo "...completed"

# # #production
# echo "Provisioning database for production environment..."
# heroku addons:create mongolab --remote production
heroku addons:create jawsdb --remote production
# echo "...completed"

# #initial deploys ########################################
# staging
echo "Deploying to staging..."
git push staging master
echo "...completed"

# production
echo "Deploying to production..."
git push production master
echo "...completed"



