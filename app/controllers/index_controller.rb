class IndexController < ApplicationController
  def index
    sleep 2
    @articles = Article.select("id, title").limit(params[:limit].to_i).offset(params[:offset].to_i)
    @count = Article.count
    args = {:article => @articles, :count => @count}
    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @articles }
      format.json { render  :json => args.to_json }
      format.js { render :json => args.to_json }
    end
  end


  def articles_count
    @count = Article.count
    respond_to do |format|
      format.json { render :json => @count.to_json }
      format.js { render :json => @count.to_json }
    end
  end

  def show
    sleep 2
    @article = Article.select(:text).find(params[:id])

    respond_to do |format|
      format.html { render :json => @article.to_json }
      format.json { render :json => @article.to_json }
      format.js { render :json => @article.to_json }
    end
  end
end