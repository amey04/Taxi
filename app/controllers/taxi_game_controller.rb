class TaxiGameController < ApplicationController
  def Description
  end

  def Play
  end

  def Questionnaire
  end

  def Summary
  end
  
  def storedata
    logger.debug "\n#{params[:steps]}}\n"
    ar = JSON.parse(params[:steps])
    uid = user.id
    render nothing: true
  end
end
